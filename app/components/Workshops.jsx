import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { graphql } from "../lib";
import { useWorkshops } from "../lib/api";
import { ADD_WORKSHOP } from "../lib/queries";

const Workshops = () => {
  const [newWorkshop, setNewWorkshop] = useState("");
  const {
    isLoading,
    data: { data: { allWorkshops = [] } = {} } = {},
    error,
  } = useWorkshops();

  const queryClient = useQueryClient();

  const mutation = useMutation(({ name }) => graphql(ADD_WORKSHOP, { name }), {
    onSuccess: () => {
      setNewWorkshop("");
      queryClient.refetchQueries("workshops");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      name: newWorkshop,
    });
  };

  return (
    <div>
      <p className="intro-text">Vous pouvez faire vos demandes ici</p>
      <div className="form-wrapper">
        <div>
          <form className="js-add-todo-form" onSubmit={handleSubmit}>
            <input
              required
              name="add-item"
              placeholder="Ajouter une demande d'atelier"
              className="form-input add-item"
              value={newWorkshop}
              onChange={({ target: { value } }) => setNewWorkshop(value)}
            />
          </form>
        </div>
      </div>
      {error && <p>Error... Whoops !</p>}
      {isLoading && (
        <div className="results">
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && !error && (
        <div className="results">
          <ul className="list">
            {allWorkshops.map(({ id, name }) => (
              <li key={id} className="list-item">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Workshops;
