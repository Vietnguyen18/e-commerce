import { useForm } from "react-hook-form";
import React from "react";
import { Products } from "../Products/CreateProducts";
import "../Create.css";
import styled from "styled-components";
import { instance } from "../../../../axios-instance";

const CreateForm = ({ saveUser, closeForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  
  const onSubmit = (data) => {
    instance.post('/listProducts', data ).then(() => {
      reset();
      closeForm();
      window.location.reload();
    });

    // Refetch data
    instance.get('/listProducts').then(Response => {
      saveUser(Response.data);
    });
  };

  console.log(errors);

  return (
    <div className="fixed top-20 left-[30vw] w-[40vw] bg-gray-400 z-10 h-[77vh]">
      <h3 className="text-center text-[19px] font-bold">Create New Products</h3>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formUser">
          <p>Name:</p>
          <input type="text" {...register('name', { required: true })} />
          {errors.name && <Mess>Please fill in Name information</Mess>}
          <p>Image:</p>
          <input type="text" {...register('img', { required: true })} />
          {errors.img && <Mess>Please fill in Image information</Mess>}
          <p>Price:</p>
          <input type="text" {...register('price')} />
          <p>Old Price:</p>
          <input type="text" {...register('oldPrice')} />
          <p>Select a Percentage:</p>
          <select {...register("percentage")}>
            <option value={"Giảm 10%"}>Giảm 10%</option>
            <option value={"Giảm 15%"}>Giảm 15%</option>
            <option value={"Giảm 20%"}>Giảm 20%</option>
            <option value={"Giảm 25%"}>Giảm 25%</option>
            <option value={"Giảm 50%"}>Giảm 50%</option>
          </select>
          <p>Select a Installment:</p>
          <select {...register("installment")}>
            <option value={"Trả góp 0%"}>Trả góp 0%</option>
          </select>
          <p>Promotion:</p>
          <input type="text" {...register('promotion')} />
          <p>Manufacturer:</p>
          <select {...register("manufacturer")}>
            <option value={"SamSung"}>SamSung</option>
            <option value={"Iphone"}>Iphone</option>
          </select>
          <div>
            <button type="submit" className="w-[80px] h-8 bg-gray-600 rounded-lg text-white m-2">Create</button>
          </div>
        </div>
        <hr />
        <div className="Btn-close">
          <button onClick={closeForm} className="w-[80px] h-8 bg-gray-600 rounded-lg text-white m-2">Close</button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;

const Mess = styled.p`
  color: red;
`;
