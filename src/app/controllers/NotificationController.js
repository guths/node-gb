import User from "../models/User";
import Notification from "../schemas/Notification";
import Appointment from "../models/Appointment";
import {isBefore, subHours} from "date-fns";

class NotificationController {
    async index(req, res) {
        const isProvider = await User.findOne({where: {id: req.userId, provider: true}})
        if (!isProvider) {
            return res.status(401).json({error: 'Only provider can load notifications.'})
        }

        const notifications = await Notification.find({
            user: req.userId
        }).sort({createdAt: 'desc'}).limit(20);

        return res.json(notifications);
    }

    async update(req, res){

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
        { read: true },
        { new: true }
        );

        return res.json(notification);
    }

    async delete(req, res){
        const appointment = await Appointment.findByPk(req.params.id);

        if(appointment.user_id !== req.userId){
            return res.status(401).json({
                error: 'You dont have permission to cancel this appointment'
            })
        }

        const dateWithSub = subHours(appointment.date, 2);
        if(isBefore(dateWithSub, new Date())){
            return res.status(401).json({
                error: 'You can only cancel appointments 2 hours earlier'
            })
        }
        appointment.canceled_at = new Date();

        await appointment.save();
        return res.json(appointment);
    }
}

export default new NotificationController()
