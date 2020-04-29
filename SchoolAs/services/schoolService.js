import {observable} from 'mobx'

export class SchoolService {
    static _schoolServiceInstance = undefined;

    getStudentClassSubject = 'http://ozkr.work/api/school/getStudentClassSubject?id=';
    getStudentData = 'http://ozkr.work/api/school/getPersonById?id=';
    getAssignment = 'http://ozkr.work/api/school/getAssignment?id=';
    completeAssignment = 'http://ozkr.work/api/school/completeAssignment?id=';
    setStateAssignment = () => {};
    setStateClasses = () => {};
    
    
    
    static createInstance(){
        if(SchoolService._schoolServiceInstance === undefined) 
            SchoolService._schoolServiceInstance = new SchoolService();
        return SchoolService._schoolServiceInstance;
    }

    setAssignmentFn(fn){
        this.setStateAssignment = fn;
    }

    setStateClassesFn(fn){
        this.setStateClasses = fn;
    }

    setStudentInfo(info){
        this.studentinfo = info;
    }

    setAssignment(ass){
        this.currentAssignment = ass;
        this.setStateAssignment(ass);
    }

    getStudentInfo(id, callback) {
        var that = this;
        console.log(that.getStudentData + id);
        fetch(that.getStudentData + id)
            .then((response) => response.json())
            .then((x) =>
            {
                that.studentinfo = x.Item;
            })
            .then(()=>{
                if(that.studentinfo && that.studentinfo.Id){
                    fetch(that.getStudentClassSubject + id)
                        .then((response) => response.json())
                        .then((res) => {
                            let result = res.Items.reduce((h, { Teacher, SchoolName, Class, Subjects, Count }) => {
                                return Object.assign(h, { [SchoolName]:( h[SchoolName] || [] ).concat({Teacher, Class, Subjects, Count})})
                            }, {});

                            for(let key in result){;
                                that.schools = that.studentinfo.schools || [];
                                that.schools.push(key);
                            }
                            that.classInfo = result;
                            callback(true);
                        },
                        (error) => {
                            callback("(failed)");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                else{
                    callback(false);
                }
            });
    }

    getAssignmentData(id, callback){
        fetch(this.getAssignment + id + '&studentId=' + this.studentinfo.Id)
            .then((response) => response.json())
            .then((res) => {
                callback(res);
            },
            (error) => {
                callback("(failed)");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    completeAssignmentFn(id, callback){
        fetch(this.completeAssignment + id + '&studentId=' + this.studentinfo.PersonId, { method: 'POST' })
            .then((response) => response.json())
            .then((res) => {
                callback(res);
            },
            (error) => {
                callback("(failed)");
            })
            .catch((error) => {
                console.log(error);
            });
    }
  
//   function handleHelpPress() {
//     WebBrowser.openBrowserAsync(
//       'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
//     );
//   } 
};