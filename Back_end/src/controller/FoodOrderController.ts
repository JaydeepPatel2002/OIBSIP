import { getRepository, Like } from 'typeorm'
import { NextFunction, query, Request, Response } from 'express'
import { FoodOrder } from '../entity/FoodOrder'
import { Controller } from '../decorator/Controller'
import { Route } from '../decorator/Route'
import { validate, ValidatorOptions } from 'class-validator'
import { Student } from '../entity/Student'
import * as console from 'console'

@Controller('/foodorder')
export default class StudentController {
    private FoodOrderRepo = getRepository(FoodOrder); // Student Repository
    // https://github.com/typestack/class-validator#passing-options
    private validOptions: ValidatorOptions = {
      stopAtFirstError: true,
      skipMissingProperties: false,
      validationError: { target: false, value: false }
    };

    @Route('get', '/:id*?') // the *? makes the param optional - see https://expressjs.com/en/guide/routing.html#route-paramters

    async read (req: Request, res: Response, next: NextFunction) {
      if (req.params.id) {
        console.log('==###' + req.query.search)
        return this.FoodOrderRepo.findOne(req.params.id)
        // eslint-disable-next-line eqeqeq
      } else if (req.query.q != undefined) {
        const findOptions:any = {
          order: {},
          where: [

            { CustomerName: Like('%' + req.query.q + '%') },
            { burger: Like('%' + req.query.q + '%') },
            { Drink: Like('%' + req.query.q + '%') },
            { SideItem: Like('%' + req.query.q + '%') }

          ]
        } // prepare order and where props
        console.log('i am called guys')
        console.log(req.query)
        return this.FoodOrderRepo.find(findOptions)
      } else {
        console.log('i am always called guys')
        console.log(req.query)
        const findOptions:any = { order: {}, where: [] } // prepare order and where props
        return this.FoodOrderRepo.find(findOptions)
      }
    }

    @Route('post') // IF the POST HTTP Request Method is used then run the action below
    async create (request: Request, response: Response, next: NextFunction) {
      // get the metadata/decorations from the User Object and fill with the values in the request body (which does not have any decorations)
      // const newUser = Object.assign(new User(), request.body);
      const newUser = this.FoodOrderRepo.create(request.body)

      const violations = await validate(newUser)
      if (violations.length) {
        response.statusCode = 422 // Uncrossable Entity
        return violations
      } else {
        response.statusCode = 201 // Created
        const identifier = this.FoodOrderRepo.insert(newUser)

        // here is the work i did for bonus marks

        const myID = (await identifier).identifiers[0].id
        return this.FoodOrderRepo.findOne(myID)
      }
    }

    @Route('delete', '/:id')
    async delete (req: Request, res: Response, next: NextFunction) {
      const studentToRemove = await this.FoodOrderRepo.findOne(req.params.id)
      res.statusCode = 204
      if (studentToRemove) await this.FoodOrderRepo.remove(studentToRemove)
      else next()
      const findOptions:any = { order: {}, where: [] } // prepare order and where props
      const student = await this.FoodOrderRepo.find(findOptions)
      return student
    }

    @Route('put', '/:id')
    async update (req: Request, res: Response, next: NextFunction) {
      /*     PRELOAD - https://typeorm.io/#/repository-api
          Creates a new entity from the a plain javascript object.
          If the entity already exists in the database, then it loads it and replaces all values with the new ones from the given object,
          and returns a new entity that is actually an entity loaded from the database with all properties replaced from the new object.
          Note that given entity-like object must have an entity id / primary key to find entity by.
          Returns undefined if entity with given id was not found.
      */
      console.log('okokok')
      const studentToUpdate = await this.FoodOrderRepo.preload(req.body)
      // Extra validation - ensure the id param matached the id submitted in the body
      // eslint-disable-next-line eqeqeq
      if (!studentToUpdate || studentToUpdate.id != req.params.id) next() // pass the buck until 404 error is sent
      else {
        const violations = await validate(studentToUpdate, this.validOptions)
        if (violations.length) {
          res.statusCode = 422 // Unprocessable Entity
          return violations
        } else {
          return this.FoodOrderRepo.save(studentToUpdate)
        }
      }
    }
}
