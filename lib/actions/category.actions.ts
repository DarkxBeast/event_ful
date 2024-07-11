'use server'

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"


export const getAllCategories = async () => {
    try {
        await connectToDatabase()

        const categories = await Category.find()

        return JSON.parse(JSON.stringify(categories))
    }
    catch (error) {
        handleError(error)
    }


} 