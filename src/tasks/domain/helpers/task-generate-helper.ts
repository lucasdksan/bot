import { faker } from "@faker-js/faker";
import { TaskProps } from "../entities/task-entity";

type Props = {
    title?: string;
    description?: string;
    code?: string;
    estimated?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}

export function TaskGenerate(props: Props): TaskProps{
    return{
        title: props.title ?? faker.commerce.productName(),
        description: props.description ?? faker.commerce.productDescription(),
        estimated: props.createdAt ?? new Date(),
        code: props.code ?? faker.commerce.isbn(),
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        createdBy: props.createdBy ?? faker.internet.email(),
        updatedBy: props.updatedBy ?? faker.internet.email(),
    }
}