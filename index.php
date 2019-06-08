<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
<!--	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">-->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
<!--    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">-->
	<link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col">
				<form id="fetchrepo" action="#">
					<div class="form-group">
						<label for="gitrepo"><h2>Git Repo</h2></label>
						<input class="form-control" type="text"id="gitrepo" name="gitrepo" aria-describedby="repoHelp">
						<small id="repoHelp" class="form-text text-muted">Enter info like this: owner/repo and click Fetch</small>
						<button type="submit" class="btn btn-primary">Fetch</button>
					</div>
				</form>
			</div>
			<div class="col">
				<div id="info"></div>
			</div>
		</div>
		<div class="row">
			<div class="col" id="selSort">
                <h2>Sortable Table</h2>
<!--				<form id="selSort" action="#">-->
<!--					<div class="form-group">-->
<!--						<label for="sortTable"><h2>Sortable Table</h2></label>-->
<!--						<select name="sortTable" id="sortTable" class="form-control">-->
<!--							<option value=""></option>-->
<!--							<option value="1">Created Date</option>-->
<!--							<option value="2"># of Comments</option>-->
<!--							<option value="3">Last Updated</option>-->
<!--						</select>-->
<!--					</div>-->
<!--				</form>-->
			</div>
			<div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
		</div>
		<div class="row">
			<div class="col">
				<table style="width: 100%" class="table" id="example"></table>
			</div>
		</div>
	</div>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="assets/js/octokit-rest.min.js"></script>
<!--<script src="https://github.com/octokit/rest.js/releases/download/v16.28.0/octokit-rest.js"></script>-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://kit.fontawesome.com/b5e6605726.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
