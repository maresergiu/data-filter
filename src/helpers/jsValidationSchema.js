import Joi from "joi";

// validation schema for js objects
const jsValidationSchema = Joi.object({
  name: Joi.string().min(1),
  gender: Joi.string().min(1),
  "eye-color": Joi.array().min(1),
  "prefered-animal": Joi.array().min(1),
  "prefered-fruit": Joi.array().min(1)
});

// custom error messages
const customErrorMessages = {
  name: {
    "string.empty": "Please insert a name"
  },
  gender: {
    "string.empty": "Please select a gender"
  },
  "eye-color": {
    "array.min": "Please select an eye color",
    "any.required": "Please select an eye color"
  },
  "prefered-animal": {
    "array.min": "Please select a prefered animal",
    "any.required": "Please select a prefered animal"
  },
  "prefered-fruit": {
    "array.min": "Please select a prefered fruit",
    "any.required": "Please select a prefered fruit"
  }
};

export default {
  jsValidationSchema,
  customErrorMessages
};
