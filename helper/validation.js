import {check} from 'express-validator'

export const signUpvalidation=[
  check('First_name','FirstName is Required').not().isEmpty(),
  check('Last_name','LastName is Required').not().isEmpty(),
  check('Email_id','Please enter a valid email').isEmail().normalizeEmail({gmail_remove_dots:true}),
  check('Password','Password is required').isLength({min:6})
]



export const loginvalidation=[
 
  check('Email_id','Please enter a valid email').isEmail().normalizeEmail({gmail_remove_dots:true}),
  check('Password','Password is min 6').isLength({min:6})
]

export const forgetvalidation=[ 
  check('Email_id','Please enter a valid email').isEmail().normalizeEmail({gmail_remove_dots:true}),
]