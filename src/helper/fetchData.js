const fetchData = async () => {
    try{
        const request = await fetch("https://mailbox-43da3-default-rtdb.firebaseio.com/mails.json",{
          method:"GET"
        })
        const data = await request.json()
        let emailArray = []
        if (data) {
          emailArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
          return emailArray;
        }
    }catch (error){
        console.error("Error: ", error)
        return null
    }
  }

export default fetchData