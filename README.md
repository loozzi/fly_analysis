<div align="center">
	<!-- Badges -->
	<p>
	<a href="https://github.com/loozzi/fly_analysis/graphs/contributors">
		<img src="https://img.shields.io/github/contributors/loozzi/fly_analysis" alt="contributors" />
	</a>
	<a href="">
		<img src="https://img.shields.io/github/last-commit/loozzi/fly_analysis" alt="last update" />
	</a>
	<a href="https://github.com/loozzi/fly_analysis/network/members">
		<img src="https://img.shields.io/github/forks/loozzi/fly_analysis" alt="forks" />
	</a>
	<a href="https://github.com/loozzi/fly_analysis/stargazers">
		<img src="https://img.shields.io/github/stars/loozzi/fly_analysis" alt="stars" />
	</a>
	<a href="https://github.com/loozzi/fly_analysis/issues/">
		<img src="https://img.shields.io/github/issues/loozzi/fly_analysis" alt="open issues" />
	</a>
	</p>
	
<h4>
	<a href="# target="_blank">Xem Demo</a>
<span> · </span>
	<a href="#" target="_blank">API</a>
<span> · </span>
	<a href="https://github.com/loozzi/fly_analysis/issues/">Báo cáo lỗi</a>
<span> · </span>
	<a href="https://github.com/loozzi/fly_analysis/issues/">Yêu cầu tính năng</a>
</h4>
</div>

## Hướng dẫn cài đặt

Clone repo:

```
git clone https://github.com/loozzi/fly_analysis.git
```

hoặc [tải file zip](https://github.com/loozzi/fly_analysis/archive/refs/heads/master.zip) và giải nén
Tiếp tục

```
cd fly_analysis/backend
```

### Cài đặt thủ công

Cài đặt thư viện

```
pip install -r requirements.txt
```

Chạy web

```
python app.py
```

### Cài đặt bằng Docker

Chạy lệnh build image

```
docker build -t <tên image>
```

Chạy container docker

```
docker run -dp <cổng host>:1000 <tên image>
```

Theo mặc định app sẽ được chạy trên cổng `1000`,
[http://localhost:1000](http://localhost:1000).
