import { Entity } from "../../../shared/domain/entities/entity";
import { EntityValidationError } from "../../../shared/domain/errors/entity-validation-error";
import { loggerFactory } from "../../../shared/infrastructure/providers/logger/logger-factory-provider";
import { schema } from "./task-schema-entity";

export type TaskProps = {
    title: string;
    description: string;
    code: string;
    estimated: Date;
    run: boolean;
    step: "Blocked";
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
};

export class TaskEntity extends Entity<TaskProps> {
    constructor(public props: TaskProps, id?: string){
        super(props, id);

        TaskEntity.validate(props);

        this.props.createdAt = this.props.createdAt ?? new Date();
        this.props.updatedAt = this.props.updatedAt ?? new Date();
    }

    update(propsToUpdate: Partial<TaskProps>) {
        const updatedProps: TaskProps = {
            ...this.props,
            ...propsToUpdate,
            updatedAt: new Date()
        };

        TaskEntity.validate(updatedProps);

        this.setProps(updatedProps);
    }

    startTask(){
        
    }

    static validate(props: TaskProps) {
        const result = schema.safeParse(props);

        if (!result.success) {
            loggerFactory().error(`Validation error: ${result.error.message}`);
            throw new EntityValidationError(`Validation error: ${result.error.message}`);
        }
    }
}