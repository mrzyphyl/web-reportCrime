const asyncHandler = require('express-async-handler')
const Crime = require('../models/CrimeReportModel')


//Get All Crime Reports
//@route GET /api/crime-report
//@access Public
const getCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.find({Crime})
    res.status(200).json(crimeRecord)
})

//Get One Crime Report
//@route GET /api/crime-report/:id
//@access Public
const getOneCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.findById(req.params.id)

    if(!crimeRecord){
        res.status(400)
        throw new Error('Appointment no found')
    }
    
    res.status(200).json(crimeRecord)
})

//Get Multiple Crime Reports
//@route GET /api/crime-report/:ids
//@access Public
const getMultiCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.find({Crime})
    res.status(200).json(crimeRecord)
})

// Get Solved Crime
// @route GET /api/solved-accidents
// @access Public

const getSolvedCrime = asyncHandler(async (req, res) => {
    const solvedCrime = await Crime.find({ isSolved: true })
  
    res.status(200).json(solvedCrime)
})

// Get Unsolved Crime
// @route GET /api/unsolved-accidents
// @access Public

const getUnsolvedCrime = asyncHandler(async (req, res) => {
    const unsolvedCrime = await Crime.find({ isSolved: false })
  
    res.status(200).json(unsolvedCrime)
})

//Post an Crime Report
//@route POST /api/crime-report
//@access Public
const postCrime = asyncHandler (async (req, res) => {
    const { 
        type_crime,
        name_crime,
        location,
        incident_date,
     } = req.body

    if(!type_crime && !name_crime && !location && !incident_date){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if Crime Report exist
    const crimeRecordExist = await Crime.findOne({type_crime, name_crime, incident_date, location})

    if(crimeRecordExist){
        res.status(400)
        throw new Error('Timeslot already in use')
    }

    const crimeRecord = await Crime.create({
        type_crime,
        name_crime,
        location,
        isSolved: false,
        incident_date
    })

    if(crimeRecord){
        res.status(201).json({
            _id: crimeRecord.id,
            type_crime: crimeRecord.type_crime,
            name_crime: crimeRecord.name_crime,
            location: crimeRecord.location,
            isSolved: crimeRecord.isSolved,
            incident_date: crimeRecord.incident_date
        })
    } else {
        res.status(400)
        throw new Error('Cant add Appointment')
    }
})

// Update a Crime Report
// @route PUT /api/solve-crime-report/:id
// @access Public

const updateOngoingCrime = asyncHandler(async (req, res) => {
    const crimeRecord = await Crime.findById(req.params.id)
  
    if (!crimeRecord) {
        res.status(400)
        throw new Error('Accident Report not found')
    }
  
    // Update the isSolved field to true
    crimeRecord.isSolved = true
  
    // Save the updated crime report
    const updatedCrimeReport = await crimeRecord.save()
  
    res.status(200).json({
      _id: updatedCrimeReport.id,
      isSolved: updatedCrimeReport.isSolved,
    })
})


//Update a Crime Report
//@route PUT /api/crime-report/:id
//@access Public
const updateCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.findById(req.params.id)

    if(!crimeRecord){
        res.status(400)
        throw new Error('Crime Record not found')
    }

    const updatedCrimeRecord = await Crime.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedCrimeRecord)
})


//Delete a Crime Report
//@route DELETE /api/crime-report/:id
//@access Public
const deltCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.findById(req.params.id)

    if(!crimeRecord){
        res.status(400)
        throw new Error('Crime Record no found')
    }

    await crimeRecord.deleteOne()

    res.status(200).json({ id: req.params.id})
})


//Delete Multiple Crime Report
//@route DELETE /api/crime-report/:ids
//@access Public
const deltMultiCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.findById(req.params.id)

    if(!crimeRecord){
        res.status(400)
        throw new Error('User no found')
    }

    await crimeRecord.deleteMany()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getCrime,
    getOneCrime,
    getMultiCrime,
    getSolvedCrime,
    getUnsolvedCrime,
    postCrime,
    updateCrime,
    updateOngoingCrime,
    deltCrime,
    deltMultiCrime
}