// Goal: Provide a function to return all chatroom data for use on the Index page

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/chatroomdata
exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnValue = []

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query against firestore for all posts, wait for it to return, store in memory
  let chatroomsQuery = await db.collection(`chatrooms`).get()

  // retrieve the documents from the query
  let chatrooms = chatroomsQuery.docs
 
  // loop through the chatroom documents
  for (let i=0; i < i.length; i++) {

    // get the data from the document
    let chatroomData = chatrooms[i].data()

    // create an Object to be added to the return value of our lambda
    let chatroomObject = {
      chatroomName: chatroomData.roomName
    }
  
    // add the Object to the return value
    returnValue.push(chatroomObject)
  
  }

  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }

}