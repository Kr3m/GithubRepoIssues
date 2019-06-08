$(document).ready(function () {
    // $("#selSort").hide();
    const octokit = new Octokit();
    const fetchrepo = document.getElementById("fetchrepo");
    const gitrepo = document.getElementById("gitrepo");
    const info = document.getElementById("info");
    // const sortTable = document.getElementById("sortTable");
    const ds = "ddd, MMM Do, YYYY @h:mma";
    // const ds = "ddd, MMM Do, YYYY @h:ma";
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
                    obj.age = m1.diff(m2, 'years');
                    obj.created_at = getDateFormat(data[i].created_at);
                    obj.title = data[i].title;
                    obj.comments = data[i].comments;
                    obj.updated_at = getDateFormat(data[i].updated_at);
                    obj.labels = data[i].labels;
                    obj.url = data[i].html_url;
                    arr.push(obj);
                    open_issues = arr.length;
                    dates.push(m2);
                }
            }

            average_age = get_average_age(arr);
            let maxDate = moment(Math.max.apply(null, dates)).format(ds);
            let minDate = moment(Math.min.apply(null, dates)).format(ds);

            htmlstr = "<h2 class='text-center'>Info</h2><table class='table'><tbody><tr><th scope='row'>Open Issues</th><td>" + open_issues + "</td></tr><tr><th scope='row'>" +
                "Average Age</th><td>" + average_age + " years</td></tr><tr><th scope='row'>Oldest Issue</th><td>" + minDate + "</td></tr><tr><th scope='row'>Latest Issue" +
                "</th><td>" + maxDate + "</td></tr></tbody></table> ";

            $(info).html(htmlstr);
            $("#selSort").show();

            let oTable = $('#example').DataTable( {
                paging: false,
                searching: false,
                info: false,
                data: setData(arr),
                order: [[3, 'desc']],
                stripeClasses: ['odd-row', 'even_row'],
                columns: [
                    {title: "Title"},
                    {title: "Created On"},
                    {title: "# of Comments"},
                    {title: "Last Updated"},
                    {title: "Labels"}
                ]
            });
            // sortTable.onchange = function () {
            //     let val = parseInt(this.value);
            //     oTable.order([val, 'asc']).draw();
            // };

            function setData(arr) {
                let dataArr = [];
                for(let i =0; i < length; i++) {
                    dataArr[i] = [getAnchor(arr[i]), getCal(arr[i].created_at), arr[i].comments, getCal(arr[i].updated_at), getLabels(arr[i].labels)];
                }
                console.log(dataArr);
                return dataArr;
            }

            function getAnchor(arr) {
                let url = arr.url;
                let title = arr.title;
                return "<a target='_blank' href='" + url + "'><i class= 'fas fa-link'></i>" + title + "</a>";
            }

            function getCal(date) {
                return "<i class='far fa-calendar-alt'></i>" + date;
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
    function getDateFormat($date) {
        return moment($date).format(ds);
    }
});
