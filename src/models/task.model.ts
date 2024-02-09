import { ObjectId } from "mongodb";

export default class TaskModel {
    _id?: ObjectId;
    titulo: string;
    descricao: string;
    dataCriacao: Date;
    tags: Array<string>;
    responsavel: string;
 
    constructor(titulo: string, descricao: string, dataCriacao: Date, tags: Array<string>, responsavel: string, id?: ObjectId) {
        this._id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataCriacao = dataCriacao;
        this.tags = tags;
        this.responsavel = responsavel;
    }
}