import { TaskGenerate } from "../../helpers/task-generate-helper";
import { TaskEntity, TaskProps } from "../task-entity";

describe("TaskEntity unit test", ()=>{
    let sut: TaskEntity;
    let initProps: TaskProps;

    beforeEach(()=> {
        initProps = TaskGenerate({  });
        sut = new TaskEntity(initProps);
    });

    test("Should Client entity generate", ()=> {
        expect(sut).toBeDefined();
        expect(sut.toJSON()).toMatchObject(initProps);
    });
});