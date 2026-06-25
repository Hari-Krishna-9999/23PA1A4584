# Notification System Design

## Stage 1

### Purpose
Provide REST APIs for logged-in students to read notifications, update status, delete messages, and receive real-time events.

### Core Actions
* Create notification
* Fetch notifications with filters
* Mark read/unread
* Delete notification
* Stream new notifications live

### Endpoints

#### 1. Create Notification
`POST /api/notifications`

Headers:
```http
Authorization: Bearer <token>
Content-Type: application/json
```
Request:
```json
{
  "studentId":"student-1042",
  "title":"Placement Update",
  "message":"Interview scheduled for Monday.",
  "notificationType":"Event",
  "priority":"normal",
  "metadata":{"company":"Acme Corp"}
}
```
Response:
```json
{
  "notificationId":"notif-9182",
  "status":"unread",
  "createdAt":"2026-06-25T08:00:00Z"
}
```

#### 2. Get Notifications
`GET /api/notifications?studentId=student-1042&status=unread&page=1&limit=20`

Headers:
```http
Authorization: Bearer <token>
```
Response:
```json
{
  "studentId":"student-1042",
  "total":12,
  "notifications":[
    {"notificationId":"notif-9182","title":"Placement Update","status":"unread","createdAt":"2026-06-25T08:00:00Z"}
  ]
}
```

#### 3. Update Status
`PATCH /api/notifications/{notificationId}/status`

Request:
```json
{ "status":"read" }
```
Response:
```json
{ "message":"Notification updated successfully" }
```

#### 4. Delete Notification
`DELETE /api/notifications/{notificationId}`

Response:
```json
{ "message":"Notification deleted successfully" }
```

#### 5. Real-Time Stream
`GET /api/notifications/stream`

Event payload:
```json
{
  "event":"notification.created",
  "data":{"notificationId":"notif-9185","notificationType":"Placement","status":"unread"}
}
```

### Rules
* `Authorization: Bearer <token>` required
* `createdAt`/`updatedAt` use ISO 8601
* `status`: `unread`, `read`, `deleted`
* `notificationType`: `Event`, `Result`, `Placement`
* `metadata` is optional

### Real-Time Mechanism
Use WebSocket / Socket.IO to emit `notification.created` when the backend stores a notification.
