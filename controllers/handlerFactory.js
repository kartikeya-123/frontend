const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError'); // class//

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('No document found with this id', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError('No document found with this id', 404));
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newdoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: newdoc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;
    // Tour.findOne({ _id: req.params.id })

    if (doc === null) {
      return next(new AppError('document is not present with this id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    // samll hack for nested get //
    let filter = {};
    if (req.params.tourId)
      filter: {
        Model: req.params.tourId;
      }
    let docs;
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    docs = await features.query; // explain()

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs,
      },
    });
  });

exports.checkBlacklist = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).select('+Blacklist');
    if (doc.Blacklist) {
      return next(
        new AppError(
          'sorry you are searching for a document which is blacklisted',
          400
        )
      );
    }
    next();
  });
