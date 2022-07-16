export const useTipps = async (comp: string, season: number, round: number) => {


    const data = await useFetch(`http://localhost:8000/api/comprounds/${comp}/${season}/${round}`)
    // if (process.server) {
    console.log(data)
    // }
    return data
}

