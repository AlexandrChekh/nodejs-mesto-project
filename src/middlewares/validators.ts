import { celebrate, Joi } from 'celebrate';

const objectIdSchema = Joi.string().hex().length(24).required();

export const validateLoginBody = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

export const validateSignupBody = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

export const validateAuthorizationHeader = celebrate({
  headers: Joi.object({
    authorization: Joi.string()
      .pattern(/^Bearer\s+\S+$/)
      .required()
  }).unknown(true)
});

export const validateUserIdParam = celebrate({
  params: Joi.object({
    userId: objectIdSchema
  })
});

export const validateUpdateProfileBody = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200)
  }).or('name', 'about')
});

export const validateUpdateAvatarBody = celebrate({
  body: Joi.object({
    avatar: Joi.string().uri().required()
  })
});

export const validateCreateCardBody = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required()
  })
});

export const validateCardIdParam = celebrate({
  params: Joi.object({
    cardId: objectIdSchema
  })
});
