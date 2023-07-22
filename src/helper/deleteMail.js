const deleteSelectedMail = async (id) => {
    try {
        const response = await fetch(`https://mailbox-43da3-default-rtdb.firebaseio.com//mails/${id}.json`,{
            method:"DELETE"
        })
        
    } catch (error) {
        console.error("Error deleting mail", error)
    }
}

export default deleteSelectedMail;