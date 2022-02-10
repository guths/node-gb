import Bee from 'bee-queue'
import CancellationMail from "../app/jobs/CancellationMail";
import redisConfig from '../config/redis'

const jobs = [CancellationMail];

class Queue {
    constructor() {
        this.queues = {};
        this.init()
    }
    //importar uma serie de jobs (trabalhos que ficam dentro de filas) (trabalhos em segundo plano)
    init() {
        jobs.forEach( ({ key, handle}) => {
            this.queues[key] = {
                //pegando todos os jobs da aplicacao
                //armazendo dentro das filas

                bee: new Bee(key, {
                    //armazena a fila que tem conecao com o banco relacional
                    redis: redisConfig
                }),
                //metodo que vai processar o job
                //vai receber as informacaoes cada vez que o job for processado e vai fazer algo (disparar emmail)
                handle
            }
        })
    }

    //metodo para adicionar um novo job dentro de uma fila
    //qual fila eu devo adicionar e qual trabalho vou adicionar
    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
    }

    //
    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];

            bee.process(handle)
        })
    }

}

export default new Queue();
