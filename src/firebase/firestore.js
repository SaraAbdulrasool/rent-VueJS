
db.collection("properties").onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        let doc = change.doc
        const property = {
          id: doc.id,
          propertyID: doc.data().id,
          ownerID: doc.data().ownerID,
          name: doc.data().name,
          description: doc.data().description,
          type: doc.data().type,
          furnish: doc.data().furnish,
          bedroom: doc.data().bedroom,
          livingroom: doc.data().livingroom,
          bathroom: doc.data().bathroom,
          kitchen: doc.data().kitchen,
          parking: doc.data().parking,
          balcony: doc.data().balcony,
          size: doc.data().size,
          location: doc.data().location,
          price: doc.data().price,
          ownerNumber: doc.data().ownerNumber,
          pictures: doc.data().pictures,
        };
        this.properties.push(property);
      }
    });
  });