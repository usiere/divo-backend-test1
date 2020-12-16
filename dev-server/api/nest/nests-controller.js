import User from '../../model/user-model';
import Nest from '../../model/nest-model';
import moment from 'moment';
import * as auth from '../../services/auth-service';

export function index(req, res) {
    // FIND ALL NECESSITIES
    Nest.find({}, (error, nests) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ nests: nests });
    }).populate('buyer', 'username', 'user');
    // Populate will find the buyer that created the necessities and add it to the necessities (username only)
}

export function create(req, res) {
    const id = auth.getUserId(req);
    User.findOne({ _id: id }, (error, user) => {
        if (error && !user) {
            return res.status(500).json();
        }
        const nest = new Nest(req.body.nest);
        nest.buyer = user._id;
        nest.dueDate = moment(nest.dueDate);

        nest.save(error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(201).json();
        });
    });
}

export function update(req, res) {
    const id = auth.getUserId(req);

    User.findOne({ _id: id }, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        if (!user) {
            return res.status(404).json();
        }

        const nest = new Nest(req.body.nest);
        nest.buyer = user._id;
        nest.dueDate = moment(nest.dueDate); // Formats the due date to a proper date format
        Nest.findByIdAndUpdate({ _id: nest._id }, nest, error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

export function remove(req, res) {
    const id = auth.getUserId(req);
    Nest.findOne({ _id: req.params.id }, (error, nest) => {
        if (error) {
            return res.status(500).json();
        }
        if (!nest) {
            return res.status(404).json();
        }
        if (nest.buyer._id.toString() !== id) {
            return res.status(403).json({ message: 'Not allowed to delete another user\'s necessity' });
        }
        Nest.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

export function show(req, res) {
    // GET NECESSITY BY ID
    Nest.findOne({ _id: req.params.id }, (error, nest) => {
        if (error) {
            return res.status(500).json();
        }
        if (!nest) {
            return res.status(404).json();
        }
        return res.status(200).json({ nest: nest });
    });
}