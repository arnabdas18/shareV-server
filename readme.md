# ShareV

It is the server side of my personal project ShareV which is a video streaming platform. ShareV lets users watch videos of others as well as let's user upload and watch their own videos. It was given as a assignment to me from a boot-camp I'm currently enrolled in.

## API Reference

### Get all videos

```http
  GET /api/videos
```

### Get videos by searching

```http
  GET /api/videos?search=${name}
```

| Parameter | Type     | Description                                             |
| :-------- | :------- | :------------------------------------------------------ |
| `name`    | `string` | **Required**. Partial or full name of video(s) to fetch |

### Get video

```http
  GET /api/videos/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of video to fetch |

### Upload video

**Restricted**. Send userId through authorization

```http
  POST /api/uservideos/upload
```

### Get videos of user

**Restricted**. Send userId through authorization

```http
  GET /api/uservideos/videos
```

### Get videos of user

**Restricted**. Send userId through authorization.

```http
  PATCH /api/uservideos/${id}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `id`      | `string` | **Required**. Id of video to patch updates |

### Get videos of user

**Restricted**. Send userId through authorization.

```http
  DELETE /api/uservideos/${id}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of video to delete |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI`

`JWT_SECRET`

## Run Locally

Clone the project

```bash
  git clone https://github.com/arnabdas18/shareV-server
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Install nodemon as dev dependency

```bash
  npm install -D nodemon
```

Start the server

```bash
  npm run start
```
