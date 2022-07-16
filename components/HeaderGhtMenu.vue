<template>
  <div class="relative">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton :class="open ? '' : 'text-opacity-90'"
        class="group inline-flex items-center rounded bg-black/50 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none ">
        <span>{{ ght?.login }}</span>
        <UserCircleIcon :class="open ? '' : 'text-opacity-70'"
          class="ml-2 h-5 w-5  transition duration-150 ease-in-out group-hover:text-opacity-80" aria-hidden="true" />
      </PopoverButton>

      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">

        <PopoverPanel class="absolute right-0 z-10 mt-1 w-screen max-w-sm transform lg:max-w-3xl">
          <div class="overflow-hidden rounded shadow-lg ring-1 ring-black ring-opacity-5">

            <div class="relative grid gap-8 bg-black/50 backdrop-blur p-8 lg:grid-cols-2">
              <a :href="'/geheimtipper/' + ght.login"
                class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                  <!-- <div v-html="item.icon"></div> -->
                  <img src="http://localhost:8000/media/avatars/1/96" class="rounded" />
                </div>
                <div class="ml-4 text-white">
                  <p class="text-sm font-medium text-gray-200">
                    {{ ght.vorname }} {{ ght.nachname }}
                  </p>
                  <p class="text-sm text-gray-400">
                    {{ ght.email }}
                  </p>
                </div>
              </a>
            </div>
            <button @click="logout">logout</button>
            <div class="bg-gray-50 p-4">
              <a href="##"
                class="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                <span class="flex items-center">
                  <span class="text-sm font-medium text-gray-900">
                    {{ registration.name }}
                  </span>
                </span>
                <span class="block text-sm text-gray-500">
                  {{ registration.motto || 'kein motto' }}
                </span>
              </a>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script>
export default {
  props: {
    login: String
  },

  methods: {
    async logout() {

      const data = await $fetch('/api/logout', {
        method: 'POST',
        body: new URLSearchParams({
          username: this.username,
          password: this.password
        })
      });
      console.log('data', data);
      // localStorage.setItem('token', null);
      // return navigateTo('/login')
      window.location.href = "/"
    }
  }
}
</script>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { UserCircleIcon } from '@heroicons/vue/outline'

const ght = useState('login');
const registration = useState('registration');

</script>