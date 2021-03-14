function graphql(query, variables = {}) {
  return fetch("/admin/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      variables,
      query,
    }),
  }).then(function (result) {
    return result.json();
  });
}

const GET_WORKSHOPS = `
  query{
    allWorkshops{
      name
    }
  }
    `;

const ADD_WORKSHOP = `
      mutation AddWorkshop($name: String!) {
        createWorkshop(data: { name: $name }) {
          name
          id
        }
      }
    `;

function createList(allWorkshops) {
  console.log("👽CLG - allWorkshops", allWorkshops);
  const list = document.createElement("ul");
  list.classList.add("list");
  allWorkshops.forEach((workshop) =>
    list.appendChild(createWorkshopItem(workshop))
  );
  return list;
}

function addTodo(event) {
  event.preventDefault();
  const form = event.target;
  const element = form.elements["add-item"];
  if (element) {
    graphql(ADD_WORKSHOP, { name: element.value }).then(fetchData);
  }

  // Clear the form
  form.reset();
}

function createWorkshopItem(workshop) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  listItem.innerHTML = workshop.name;
  return listItem;
}

function fetchData() {
  graphql(GET_WORKSHOPS)
    .then(({ data: { allWorkshops } }) => {
      document.querySelector(".results").innerHTML = "";
      const list = createList(allWorkshops);
      document.querySelector(".results").appendChild(list);
    })
    .catch(function (error) {
      console.log(error);
      document.querySelector(".results").innerHTML = "<p>Error</p>";
    });
}

document.querySelector(".js-add-todo-form").addEventListener("submit", addTodo);
fetchData();
