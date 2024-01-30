import React from "react";
import Select from "react-select";
type variable = {
    idcategory:any
  Nomcategory: any;
  setNomcategory: Function;
  setidcategory: Function;
  listeCategorySelection: any;
};
function SelectCategory({
    idcategory,
    Nomcategory,
  listeCategorySelection,
  setidcategory,
  setNomcategory,
}: variable) {
  return (
    <div>
      <Select
        onChange={(e: any) => {
          setNomcategory(e.label); /*Pour récupérer le nom du clt*/
          setidcategory(e.value);
          console.log(Nomcategory);
          console.log(idcategory)
        }}
        options={listeCategorySelection}
        placeholder="Sélectionnez une Category"
      />
    </div>
  );
}

export default SelectCategory;
