import { getRepository, Like } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { FoodOrder } from '../entity/FoodOrder'
import { Controller } from '../decorator/Controller'
import { Route } from '../decorator/Route'
import { validate, ValidatorOptions } from 'class-validator'
import { employee } from '../entity/employee'

@Controller('/Employee')
export default class EmployeeController {
    private EmployeeRepo = getRepository(employee); // Student Repository
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
        return this.EmployeeRepo.findOne(req.params.id)
      } else if (req.query.search !== undefined) {
        const findOptions:any = {
          order: {},
          where: [

            { employeeName: Like('%' + req.query.search + '%') },
            { perHourPay: Like('%' + req.query.search + '%') },
            { joiningDate: Like('%' + req.query.search + '%') }

          ]
        } // prepare order and where props
        return this.EmployeeRepo.find(findOptions)
      } else {
        const findOptions:any = { order: {}, where: [] } // prepare order and where props
        return this.EmployeeRepo.find(findOptions)
      }
    }

    @Route('delete', '/:id')
    async delete (req: Request, res: Response, next: NextFunction) {
      const EmployeeToRemove = await this.EmployeeRepo.findOne(req.params.id)
      res.statusCode = 204
      if (EmployeeToRemove) await this.EmployeeRepo.remove(EmployeeToRemove)
      else next()
      const findOptions:any = { order: {}, where: [] } // prepare order and where props
      const Employee = await this.EmployeeRepo.find(findOptions)
      return Employee
    }

    @Route('post') // IF the POST HTTP Request Method is used then run the action below
    async create (request: Request, response: Response, next: NextFunction) {
      // get the metadata/decorations from the User Object and fill with the values in the request body (which does not have any decorations)
      // const newUser = Object.assign(new User(), request.body);
      const newUser = this.EmployeeRepo.create(request.body)

      const violations = await validate(newUser)
      if (violations.length) {
        response.statusCode = 422 // Uncrossable Entity
        return violations
      } else {
        response.statusCode = 201 // Created
        const identifier = this.EmployeeRepo.insert(newUser)

        // here is the work i did for bonus marks

        const myID = (await identifier).identifiers[0].id
        return this.EmployeeRepo.findOne(myID)
      }
    }
}
