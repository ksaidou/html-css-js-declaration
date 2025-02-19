function search() {}
/*function handleDetailClick(id) {
  const filteteredDeclarations = DECLARATIONS.filter((item) => item.id === id);
  if (filteteredDeclarations.length) {
    const declaration = filteteredDeclarations[0];
    console.log("====================================");
    console.log(declaration);
    console.log("====================================");
  }
  // traitement non achevé; aucun impact sur le html;
}*/

const handleDetailClick = () => null;

const handleDeclarations = (declarations) => {
  const COLONNES = `
    <div class="row">    
        <div class="col">
          Date
        </div>
        <div class="col">
          Parent 1
        </div>
        <div class="col">
        Parent 2
        </div>
        <div class="col">
          Enfant
        </div>
        <div class="col">
            Hopital
        </div>
        <div class="col">
            Action
        </div>
    </div>
   `;
  const T_DECLARATIONS = declarations.map((declaration, index) => {
    const {
      id,
      registred,
      firstParent: {
        gender: fpGender,
        birthdate: fpBirthdate,
        firstname: fpFirstname,
        lastname: fpLastname,
        email: fpEmail,
        phone: fpPhone,
      },
      secondParent: {
        gender: spGender,
        birthdate: spBirthdate,
        firstname: spFirstname,
        lastname: spLastname,
        email: spEmail,
        phone: spPhone,
      },
      child: {
        birthdate: cBirthdate,
        gender: cGender,
        firstname: cFirstname,
        lastname: cLastname,
      },
      compagny: { name: cName, address: cAddress },
    } = declaration;
    return ` 
     <div class="py-2 ${index % 2 === 1 ? "row bg-light" : "row"}">
        <div class="col">
            <p class="mb-0"> ${registred} </p>
        </div>
        <div class="col">
            <p class="mb-0">${fpGender} ${fpBirthdate} ${fpFirstname} ${fpLastname}</p>
            <p class="mb-0">${fpEmail}</p>
            <p class="mb-0">${fpPhone}</p>
        </div>
        <div class="col">
            <p class="mb-0">${spGender} ${spBirthdate} ${spFirstname} ${spLastname}</p>
            <p class="mb-0">${spEmail} </p>
            <p class="mb-0">${spPhone}</p>
        </div>
        <div class="col">
            <p class="mb-0">${cGender} ${cBirthdate} ${cFirstname} ${cLastname}</p>
        </div>

         <div class="col">
            <p class="mb-0">${cName}</p>
            <p class="mb-0">${cAddress}</p>
        </div>
        <div class="col">
            <button type="button" class="btn btn-outline-primary" onclick="handleDetailClick('${id}')">Action</button>
        </div>
  </div>`;
  });
  const LINES = [COLONNES, ...T_DECLARATIONS];
  //document.getElementById("les_declarations").innerHTML =
  //T_DECLARATIONS.join("");
  document.getElementById("les_declarations").innerHTML = LINES.join("");
};

async function handleOnload() {
  const response = await fetch("http://localhost:8080/declarations");
  const data = await response.json();
  handleDeclarations(data);

  /* .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      handleDeclarations(data);
      console.log(data);
    })
    .catch((error) => {
      console.log("===================");
      console.log({ error });
      console.log("===================");
    }); */
}

async function handleNewDeclaration(event) {
  event.preventDefault();
  const { target } = event;
  console.log("====================================");
  console.log(target);
  console.log("====================================");
  const formData = new FormData(target);
  console.log("====================================");

  const fpFirstName = formData.get("fpfirstname");
  const fpLastName = formData.get("fplastname");
  const spFirstName = formData.get("spfirstname");
  const spLastName = formData.get("splastname");
  const chFirstName = formData.get("chfirstname");
  const chLastName = formData.get("chlastname");
  const declaration = {
    firstParent: { firstname: fpFirstName, lastname: fpLastName },
    secondParent: { firstname: spFirstName, lastname: spLastName },
    child: { firstname: chFirstName, lastname: chLastName },
  };
  try {
    const response = await fetch("http://localhost:8080/declarations", {
      method: "POST",
      body: JSON.stringify(declaration),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    //console.log({ data });
  } catch (error) {
    console.log("====================================");
    console.log({ error });
    console.log("====================================");
  }
  console.log("====================================");
}
