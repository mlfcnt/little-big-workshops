export const GET_WORKSHOPS = `
query{
  allWorkshops{
      id
    name
  }
}
  `;

export const ADD_WORKSHOP = `
      mutation AddWorkshop($name: String!) {
        createWorkshop(data: { name: $name }) {
          name
          id
        }
      }
    `;
