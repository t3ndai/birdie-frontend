import { useQuery } from 'react-query'
import axios from 'axios'

function useEvents() {
    return useQuery('events', async () => {
      const { data } = await axios.get('https://afternoon-peak-67651.herokuapp.com/events')
      console.log(data)
      return data 
    })
}

export default useEvents