import { getAxiosError } from "@/utils/error";
import React, { useState } from "react";
import Input from "../commons/input";
import { SaveIcon, UserFormIcon } from "../commons/icons";
import TextArea from "../commons/textArea";
import Button from "../commons/button";
import { message } from "antd";
import { createConcert } from "@/services/concert/create";

const FormCreateConcert = () => {
  const [concertName, setConcertName] = useState("");
  const [totalSeat, setTotalSeat] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    concertName?: string;
    totalSeat?: string;
    description?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!concertName.trim()) newErrors.concertName = "Concert name is required";
    if (!totalSeat.trim()) newErrors.totalSeat = "Total of seat is required";
    if (!description.trim()) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      await createConcert({
        name: concertName,
        totalSeat: Number(totalSeat),
        description,
      });
      message.success("Concert created successfully");
      setConcertName("");
      setTotalSeat("");
      setDescription("");
    } catch (error) {
      message.error(`Failed to create concert : ${getAxiosError(error)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-semibold text-text mb-4">Create</h2>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <Input
          label="Concert Name"
          placeholder="Please input concert name"
          value={concertName}
          onChange={setConcertName}
          error={errors.concertName}
        />
        <Input
          label="Total of seat"
          placeholder="Please input total of seat"
          value={totalSeat}
          type="number"
          onChange={setTotalSeat}
          suffixIcon={<UserFormIcon className="text-black w-6 h-6" />}
          error={errors.totalSeat}
        />
      </div>

      <div className="mb-6">
        <TextArea
          label="Description"
          placeholder="Please input description"
          value={description}
          onChange={setDescription}
          error={errors.description}
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-text"
          prefixIcon={<SaveIcon className="text-white w-4 h-4" />}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormCreateConcert;
