import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { NotFoundException } from '@nestjs/common';

import {Controller} from '../decorator/Controller';
import {Route} from '../decorator/Route';

import {validate} from 'class-validator';

@Controller('/users') // the base path is http://localhost:3004/users



export default class UserController {
    private userRepository = getRepository(User);

    @Route('get')

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    @Route('get', '/:id') // IF a param is specified then the path is http://localhost:3004/users/1


/*
Exercise 12: Please handle the scenario when the records are not found
please refer to this for some help if you need
https://medium.com/the-crowdlinker-chronicle/best-way-to-inject-repositories-using-typeorm-nestjs-e134c3dbf53c
 */
    async one(request: Request, response: Response, next: NextFunction) {
        // @ts-ignore
        return this.userRepository.findOne(request.params.id).then(entity => {
            if (!entity) {
                //response.statusCode = 404
                //throw new Error("i can't do anything");
                return "<h2>user with this ID is not exists</h2>"
                return new NotFoundException('this Model not found.');
                return Promise.reject(
                    new NotFoundException('Model not found.')
                );
            }
            else
            {
               return Promise.resolve(entity ? entity : null);

            }

        }).catch(error => Promise.reject(error));
    }




    @Route('post') // IF the POST HTTP Request Method is used then run the action below


    async save(request: Request, response: Response, next: NextFunction) {
        // get the metadata/decorations from the User Object and fill with the values in the request body (which does not have any decorations)
        const newUser = Object.assign(new User(), request.body);

        const violations = await validate(newUser);
        if (violations.length) {
            response.statusCode = 422; // Uncrossable Entity
            return violations;
        } else {
            response.statusCode = 201; // Created
            return this.userRepository.save(newUser);
        }
    }





    @Route('delete', '/:id') // IF the DELETE HTTP Request Method is used then run the action below

    async remove(request: Request, response: Response, next: NextFunction) {
        const userToRemove = await this.userRepository.findOne(request.params.id);
        response.statusCode = 204; // No Content
        if (userToRemove) return this.userRepository.remove(userToRemove);
        else next(); // let index.ts catch the 404 error and reply with JSON
    }


}
