$(document).ready(function () {
    // $("#selSort").hide();
    const octokit = new Octokit();
    const fetchrepo = document.getElementById("fetchrepo");
    const gitrepo = document.getElementById("gitrepo");
    const info = document.getElementById("info");
    const sortTable = document.getElementById("sortTable");
    let arr = [];
    let average_age = [];
    let dates = [];
    let open_issues = 0;
    let length;
    let owner;
    let repo;
    let htmlstr;

    fetchrepo.addEventListener("submit", formHandler);
    function formHandler(e) {
        e.preventDefault();
        let arr = gitrepo.value.split("/");
        owner = arr[0];
        repo = arr[1];
        getData();
    }

    function getData() {
        let req = octokit.issues.listForRepo({
            owner: owner,
            repo: repo
        })
        .then(({data}) => {
            length = data.length;
            for(let i = 0; i < length; i++) {
                if(data[i].state === "open") {
                    let obj = {};
                    let m1 = moment();
                    let m2 = moment(data[i].created_at);
                    obj.age = m1.diff(m2, 'seconds');
                    obj.created_at = data[i].created_at;
                    obj.title = data[i].title;
                    obj.comments = data[i].comments;
                    obj.updated_at = data[i].updated_at;
                    obj.labels = data[i].labels;
                    arr.push(obj);
                    open_issues = arr.length;
                    dates.push(m2);
                }
            }

            average_age = get_average_age(arr);
            let maxDate = new Date(Math.max.apply(null, dates));
            let minDate = new Date(Math.min.apply(null, dates));
            htmlstr = "<h2>Info</h2><ul><li><strong>Open Issues: " + open_issues + "</strong></li><li><strong>Average Age: " + average_age +
            "</strong></li><li><strong>Oldest Issue: " + minDate + "</strong></li><li><strong>Latest Issue: " + maxDate +
            "</strong></li></ul>";
            $(info).html(htmlstr);
            $("#selSort").show();

            let oTable = $('#example').DataTable( {
                paging: false,
                searching: false,
                info: false,
                data: setData(arr),
                columns: [
                    {title: "Title"},
                    {title: "Created On"},
                    {title: "# of Comments"},
                    {title: "Last Updated"},
                    {title: "Labels"}
                ]
            });
            sortTable.onchange = function () {
                let val = parseInt(this.value);
                oTable.order([val, 'asc']).draw();
            };

            function setData(arr) {
                let dataArr = [];
                for(let i =0; i < length; i++) {
                    dataArr[i] = [arr[i].title, arr[i].created_at, arr[i].comments, arr[i].updated_at, getLabels(arr[i].labels)];
                }
                console.log(dataArr);
                return dataArr;
            }

            function getLabels(lbl) {
                if(lbl.length === 0) {
                    return "No Labels";
                } else {
                    let str = "";
                    lbl.forEach(function (e) {
                        str += e.name + " ";
                    });
                    return str;
                }
            }
        });
        $(".dropdown a").click(function (e) {
            e.preventDefault();
            console.log(this.target.id);
        });
    }

    function get_average_age($arr) {
        let total = 0;
        for(let i = 0; i < length; i++){
            total += $arr[i].age;
        }
        return total / length;
    }
});
