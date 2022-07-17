<template>
  <div>

    <nav class="p-2 flex justify-between border-b border-dashed">
      {{ ght }}
    </nav>

    <nav class="p-2 flex justify-between border-b border-dashed">
      <button @click="
        $router.push({
          params: { saison: saison - 1, spieltag: spieltag }
        })
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <h1 class="m-auto">Saison {{ saison - 1 }}/{{ saison % 100 }}</h1>
      <button @click="
        $router.push({
          params: { saison: saison + 1, spieltag: spieltag }
        })
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </nav>
    <nav class="p-2 flex justify-between border-b border-dashed">
      <button :disabled="spieltag <= 1" @click="
        $router.push({
          params: { saison: saison, spieltag: spieltag - 1 }
        })
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <!-- <nuxt-link :to="{ params: { saison: saison, spieltag: spieltag-1 } }">Spieltag {{spieltag - 1}}</nuxt-link> -->
      <h1 class="m-auto">Spieltag {{ spieltag }}</h1>
      <!-- <nuxt-link :to="{ params: { saison: saison, spieltag: spieltag+1 } }">Spieltag {{spieltag + 1}}</nuxt-link> -->
      <button :disabled="spieltag >= round.compSeason.nrounds" @click="
        $router.push({
          params: { saison: saison, spieltag: spieltag + 1 }
        })
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </nav>
    <nuxt-link to="/login">login</nuxt-link>
    <main v-if="pending">pending</main>
    <main v-if="error">{{ error }}</main>
    <main v-if="round">
      <section class="overflow-x-auto">
        <table class="m-auto">
          <tbody>
            <tr>
              <td colspan="6"></td>
              <td v-for="t in tipperlist" :key="t.id" class="w-10 text-center font-light">
                {{ t }}
              </td>
            </tr>

            <tr v-for="(m, i) in round.matches" :key="m.no">
              <td>
                {{
                    dateifchanged(
                      m.kickoff,
                      i > 0 ? round.matches[i - 1].kickoff : null
                    )
                }}
              </td>
              <td class="px-2">{{ time(m.kickoff) }}</td>
              <td class="text-right font-semibold">
                {{ round.teams[m.teams[0]]?.name || m.teams[0] }}
              </td>
              <td class="w-auto">
                <input class="w-10 py-0.5 text-center bg-gray-200 m-1" :value="m.result"
                  @input="setResult(m.id, $event.target.value)" />
                <!-- <div  class="m-1 p-0.5 px-1 font-bold border-0 border-black rounded">{{m.result}}</div> -->
              </td>
              <td class="text-left font-bold">
                {{ round.teams[m.teams[1]]?.name || m.teams[1] }}
              </td>
              <td class="text-center">
                <input class="w-10 border border-black rounded text-center" :value="mytipps[m.id]"
                  @input="setTipp(m.id, $event.target.value)" />
              </td>
              <td v-for="tipper in tipperlist" :key="tipper" class="text-center">
                <Tipp v-if="m.odds" :tipp="m.odds.tipps[tipper]" />
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colspan="3"></td>
              <td colspan="2">
                <button @click="submitResults" class="bg-blue-500 text-white rounded p-2">
                  Submit
                </button>
              </td>
              <td>
                <button @click="submitTipps" class="bg-blue-500 text-white rounded p-2">
                  Submit
                </button>
              </td>
            </tr>
            <tr>
              <td colspan="6"></td>
              <td v-for="t in tipperlist" :key="t.id" class="w-10 text-center font-light">
                <div>{{ round.evals[t].spieltag.punkte }}</div>
              </td>
            </tr>
            <tr>
              <td colspan="6">Tageswertung:</td>
              <td v-for="t in tipperlist" :key="t.id" class="w-10 text-center font-light">
                {{ round.evals[t].spieltag?.platz }}. <br />
                {{ round.evals[t].spieltag?.punkte }}
              </td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">Gesamtwertung:</td>
              <td v-for="t in tipperlist" :key="t.id" class="w-10 text-center font-light">
                {{ round.evals[t].trikots['GELB']?.platz }}.
              </td>
            </tr>
            <tr>
              <td v-for="t in tipperlist" :key="t.id" class="w-10 text-center font-light">
                {{ round.evals[t].trikots['GELB']?.punkte }}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section class="flex flex-col md:flex-row gap-8 items-center md:justify-around items-start bg-gray-200">
        <h3>Tabelle</h3>
        <table
          class="table-auto border-collapse border-y md:border border-gray-300 md:rounded md:shadow bg-white w-full">
          <tbody class="divide-y divide-gray-300">
            <tr v-for="t in round.tabelle" :key="t.team" class="[&>*]:border-b [&>*]:border-gray-300 [&>*]:py-1">
              <td class="text-right">{{ t.POS }}.</td>
              <td class="text-left">
                <svg v-if="t.PD > 0" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
                <svg v-else-if="t.PD < 0" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </td>
              <td class="font-semibold">
                {{ round.teams[t.team].name || t.team }}
              </td>
              <td class="">{{ t.PLD }}</td>
              <td class="text-center">{{ t.W }}-{{ t.D }}-{{ t.L }}</td>
              <td>{{ t.GF }}:{{ t.GA }}</td>
              <td class="text-right">
                {{ round.compSeason.quot ? t.GQ : t.GD }}
              </td>
              <td class="font-bold" v-if="round.compSeason['pkt2']">
                {{ t.PP }}:{{ t.MP }}
              </td>
              <td class="font-bold" v-else>{{ t.PTS }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table-auto border-collpase border border-black rounded shadow bg-gray-100">
          <tbody>
            <tr v-for="ght in tipperlist" :key="ght" class="hover:bg-gray-300">
              <td class="text-right">
                {{ round.evals[ght].trikots.GELB?.platz }}.
              </td>
              <td class="py-1">{{ ght }}</td>
              <td>
                <small>{{ round.evals[ght].ntipps }} Tipps</small>
              </td>
              <td>
                {{ round.evals[ght].trikots.GELB?.punkte }}
                <small _ngcontent-c6="">Pkt.</small>
              </td>
            </tr>
          </tbody>
        </table>
      </section>


      <ul class="flex flex-col justify-between py-20 px-4 max-w-screen-lg w-full mx-auto">
        <li v-for="(e, ght) in round.evals" :key="e.ght"
          class="flex justify-between items-center relative pl-3 mb-[-1px] bg-white border-y border-gray-100">
          <div
            class="font-family: 'Carter One',cursive; font-weight: 500; font-size: 1.6rem; white-space: nowrap; flex: 0 0 1.5rem; margin-right: 0; text-align: right;">
            {{ e.trikots.GELB?.platz }}.
          </div>
          <img _ngcontent-c6="" class="${api}/media/avatars/${1}`" />
          <section _ngcontent-c6="" class="name">
            <h5 _ngcontent-c6="">
              {{ ght }}
              <small _ngcontent-c6=""><i _ngcontent-c6="" class="fa fa-sm fa-user-circle-o"></i>{{ ght }}</small>
            </h5>
            <blockquote _ngcontent-c6="">asdf</blockquote>
            <blockquote _ngcontent-c6="" class="narrow">
              {{ e.ntendenz }}/{{ e.ntreffer }} Tipps
            </blockquote>
          </section>
          <div _ngcontent-c6="" class="meta-wrapper">
            <small _ngcontent-c6="" class="tipps">{{ e.ntipps }} Tipps</small><br _ngcontent-c6="" /><small
              _ngcontent-c6="" class="tipps">{{ e.runden }} Runden</small>
          </div>
          <div _ngcontent-c6="" class="score-wrapper">
            <div _ngcontent-c6="" class="score">
              {{ e.trikots.GELB?.punkte }}
              <small _ngcontent-c6="">Pkt.</small>
            </div>
          </div>
          <div _ngcontent-c6="" class="detail-indicator">
            <a _ngcontent-c6="" class="" href="/geheimtipp/2022/tipper/1"><i _ngcontent-c6=""
                class="fa fa-chevron-right"></i></a>
          </div>
        </li>
      </ul>
    </main>
    <div v-if="round" class="text-blue-500"></div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const api = config.API_BASE_URL + '/api'

const ght = useState('ght');

const route = useRoute();
const saison = parseInt(route.params.saison); //2004 //computed(() => route.params.saison)
const spieltag = parseInt(route.params.spieltag);

//
// let token
// if ( process.server) {
//   const {cookie} = useRequestHeaders(['cookie'])
//   const cookies = Object.fromEntries(cookie.split(",").map((a) => a.split("=")))
//   token = cookies.token
//   console.log("cookies:", cookies,token)
// } else {
//   token = useCookie('token');
//   console.log("token:", token.value)
// }

// const event = useRequestEvent()

// const { data, pending, error } = await useFetch(
//   `http://localhost:8000/api/comprounds/BL/${saison}/${spieltag}`
// );
const round = await $fetch(`/api/comprounds/BL/${saison}/${spieltag}`)
// console.log("error:", round)
// const round = JSON.parse(data._value);
// console.log(round)

const date = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}).format;

const dateifchanged = (datestr, prev) => {
  if (!prev) {
    return date(new Date(datestr));
  }
  const ts = new Date(datestr);
  const tsprev = new Date(prev);
  if (
    tsprev &&
    ts.getYear() === tsprev.getYear() &&
    ts.getMonth() === tsprev.getMonth() &&
    ts.getDate() === tsprev.getDate()
  ) {
    return '';
  }
  return date(new Date(datestr));
};

const time = (datestr) => {
  const time = new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  }).format;
  return time(new Date(datestr));
};
</script>

<script>
export default {
  data() {
    return {
      // mytipps:Object.fromEntries(this.round.matches.map(m => {
      //   return  [`${m.teams[0]}${m.teams[1]}`,  `2:3`]
      // }))
      // mytipps: Object.fromEntries(this.round.matches.map(m => {
      //   const tipp = m.odds&&m.odds.tipps&&m.odds.tipps['matt'];
      //   return tipp ? [`${m.teams[0]}${m.teams[1]}`,  `${tipp.login}`] : ''
      // }))
    };
  },

  computed: {
    mytipps() {
      if (!this.round.matches) {
        return {};
      }
      const data = this.round.matches.map((m) => {
        if (m.odds && m.odds.tipps && m.odds.tipps[this.ght]) {
          const tipp = m.odds.tipps[this.ght];
          return [`${m.id}`, `${tipp.ht}:${tipp.at}`];
        }
        return [`${m.id}`, ``] // [`${m.teams[0]}${m.teams[1]}`, ``];
      });
      return Object.fromEntries(data);
    },
    tipperlist() {
      const sortScore = (a, b) => (a > b ? 1 : a === b ? 0 : -1);

      const logins = Object.keys(this.round.evals);
      logins.sort((a, b) =>
        sortScore(
          this.round.evals[a].trikots.GELB?.platz,
          this.round.evals[b].trikots.GELB?.platz
        )
      );
      return logins;
    }
  },

  methods: {
    setResult(match, result) {
      const matches = this.round.matches.filter((m) => m.id === match);
      const m = matches.length ? matches[0] : {};
      m.result = result;
    },
    setTipp(match, tipp) {
      this.mytipps[match] = tipp;
    },

    async submitResults() {
      await $fetch(
        `/api/comprounds/BL/${this.saison}/${this.spieltag}`,
        {
          method: 'PUT',
          body: new URLSearchParams(
            Object.fromEntries(this.round.matches.map((m) => [m.id, m.result]))
          )
        }
      );
    },

    async submitTipps() {
      await $fetch(
        `/api/comprounds/BL/${this.saison}/${this.spieltag}/tipps`,
        {
          method: 'PUT',
          body: new URLSearchParams({ ...this.mytipps }),
          credentials: 'include',
          headers: {
            cookie: `token=${useCookie(['token']).value}`
          }
        }
      );
    }
  }
};
</script>
