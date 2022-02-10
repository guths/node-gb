import Mail from "../../lib/Mail";
import {format, parseISO} from "date-fns";
import pt from "date-fns/locale/pt-BR";

class CancellationMail {

    //functiona como um metodo estatico, quando chamado, CancellationMail.key() =D
    //cada job precisa de um chave unica
    get key() {
        return 'CancellationMail';
    }

    //é a tarefa que vai ser chamada quando o processo foir executado
    //se 10 emails forem chamados, 10 handles serao chamados
    async handle({ data }) {
        console.log('a fila foi executada')
        const { appointment } = data
        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancellation',
            context: {
                provider:appointment.provider.name,
                user: appointment.user.name,
                date: format(parseISO(appointment.date), "'dia' dd 'de' MMMM', às' H:mm'h'", {locale: pt})
            }
        });
    }
}

export default new CancellationMail();
