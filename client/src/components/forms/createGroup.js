import React from "react";
import * as Yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import TextField from "../form-hooks/TextField";
import AutoComplete from "../form-hooks/AutoComplete";
import "../../assets/styles/createGroup.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Contacts = ["Rock", "Paper", "Scissors"];

const CreateGroupForm = ({ handleClose }) => {
  const NewGroupSchema = Yup.object().shape({
    name: Yup.string().required("Group name is required"),
    members: Yup.array().min(2, "A group should have at least 2 members"),
  });

  const defaultValues = {
    title: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // Insert API call
      console.log("DATA", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dialog-content">
          <TextField name="name" label="Group Name" />
          <AutoComplete
            name="members"
            label="Members"
            multiple
            freeSolo
            options={Contacts.map((option) => option)}
            ChipProps={{ size: "medium" }}
          />
          <div className="buttons">
            <Button
              variant="contained"
              onClick={handleClose}
              style={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              style={{ textTransform: "none" }}
            >
              Create
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
    >
      <DialogTitle>Create new group</DialogTitle>

      <DialogContent>
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
