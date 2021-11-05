
				// Your web app's Firebase configuration
				// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
					apiKey: "AIzaSyD3iN0qeORQpg87juyZt6sZDesPd8sO7XA",
					authDomain: "web-scheduled.firebaseapp.com",
					projectId: "web-scheduled",
					storageBucket: "web-scheduled.appspot.com",
					messagingSenderId: "116449923756",
					appId: "1:116449923756:web:6af8fce259ac33a433c509",
					measurementId: "G-L8FYZM22X1"
				};
				// Initialize Firebase
				firebase.initializeApp(firebaseConfig);
				firebase.analytics();

// Reference messages collection
const database = firebase.database();

var id = Math.floor(Math.random() * 1000);
var input_ID= id.toString();
const datetime = document.getElementById("currentDate");
const student = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const category = document.getElementById("demo-category");
console.log("Nilai id: "+input_ID)
console.log(typeof(student.value))
const submit = document.getElementById("submit");

submit.addEventListener('click',(e) => {
	e.preventDefault();
	database.ref('/users/'+input_ID).set({
  date_time: currentDate.value,
  student_name: student.value,
  email_student: email.value,
  phone_student: phone.value,
  category_book: category.value
	});
  document.querySelector('.alert').style.display='block';
  setTimeout(function(){
  document.querySelector('.alert').style.display='none';
  },3000);

  firebase.database().ref('users/').once('value',(sanpshot)=>{
    console.log(sanpshot.val())
	if(snapshot.exists()){
        var content = '';
        snapshot.forEach(function(data){
            var val = data.val();
            content +='<tr>';
            content += '<td>' + val.date_time + '</td>';
            content += '<td>' + val.student_name + '</td>';
            content += '<td>' + val.email_student + '</td>';
            content += '<td>' + val.phone_student + '</td>';
			content += '<td>' + val.category_book + '</td>';
            content += '</tr>';
        });
        $('#table1').append(content);
    }
  })
});

(function() {
  const dataStudents = document.getElementById('read-firebase');
  const dbStudentRef = firebase.database().ref('users/');
  dbStudentRef.on('value', snap => dataStudents.innerText = snap.val());
  var table = document.querySelector('#table1 tbody');
  dbStudentRef.on('value', snap => {
    while(table.hasChildNodes()) {
		    table.removeChild(table.firstChild);
	  }
    var studentsData = snap.val();
    for(var i in studentsData) {
      var row = table.insertRow(-1);
      for(var j in studentsData[i]) {
				cell = row.insertCell(-1);
				cell.innerHTML = studentsData[i][j];
			}
		}
  });
}());
