export class SchoolService {
    getStudentClassSubject = 'http://ozkr.work/api/school/getStudentClassSubject?id='
  
    static studentinfo = {};

    static cleartstudent = () => {};

    getStudentInfo(id, callback) {
        return fetch(this.getStudentClassSubject + id)
            .then((response) => response.json())
            .then(
            (res) => {
                SchoolService.studentinfo = {};
                let result = res.Items.reduce((h, { FullName, SchoolName, Class, Subjects }) => {
                    return Object.assign(h, { [SchoolName]:( h[SchoolName] || [] ).concat({FullName, Class, Subjects})})
                }, {});

                for(let key in result){;
                    SchoolService.studentinfo.schools = SchoolService.studentinfo.schools || [];
                    SchoolService.studentinfo.schools.push(key);
                    SchoolService.studentinfo[key] = result[key];
                }
                
                callback(result);
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