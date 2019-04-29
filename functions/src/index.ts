import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const sendOnFirestoreUpdate = functions.firestore
  .document(`lobbies/{lobbiesId}`)
  .onUpdate((change, context) => {
    const newVal = change.after.data();
    console.log({ newVal });
    if (newVal === undefined) {
      return null;
    }
    if (newVal.status !== "inGame") return null;
    for (const ans of newVal.answers) {
      if (!ans) {
        return null;
      }
    }
    const status = "question";
    const answers = new Array();
    const points = newVal.points.slice(0);
    const userIds = newVal.uids.slice(0);
    let temp;
    const len = newVal.answers.length;
    for (let i = 0; i < len; i++) {
      for (let j = 1; j < len; j++) {
        if (points[j - 1] > points[j]) {
          temp = points[j];
          points[j] = points[j - 1];
          points[j - 1] = temp;
          temp = userIds[j];
          userIds[j] = userIds[j - 1];
          userIds[j - 1] = temp;
        }
      }
    }
    points.reverse();
    userIds.reverse();
    for (let i = 0; i < len; i++) {
      answers.push(false);
    }

    return change.after.ref.set(
      {
        answers: answers.slice(0),
        status: status,
        uids: userIds.slice(0),
        points: points.slice(0),
      },
      { merge: true },
    );
  });
