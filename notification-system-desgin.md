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

## Stage 2

### Persistent Storage Recommendation
Use PostgreSQL because it provides strong consistency, efficient filtering, and reliable transactional updates for notifications.

### Database Schema
`notifications`
- `notification_id` UUID PRIMARY KEY
- `student_id` UUID NOT NULL
- `title` TEXT NOT NULL
- `message` TEXT NOT NULL
- `notification_type` VARCHAR(32) NOT NULL
- `priority` VARCHAR(16) NOT NULL DEFAULT 'normal'
- `status` VARCHAR(16) NOT NULL DEFAULT 'unread'
- `metadata` JSONB
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT NOW()
- `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE

Indexes:
- `(student_id, status)`
- `(student_id, notification_type)`
- `(student_id, created_at DESC)`

### Volume Challenges
- Large tables cause slower scans and sorts.
- Unindexed filters on `student_id`/`status` degrade read performance.
- Too many indexes increase write cost.
- Synchronous real-time delivery can slow writes if tied directly to DB operations.

### Solutions
- Use targeted composite indexes for common query patterns.
- Paginate results instead of returning full lists.
- Soft delete with `is_deleted` rather than hard delete.
- Archive or purge old notifications after a retention period.
- Separate persistence from real-time broadcast via a queue or pub/sub.

### Sample Queries
Create notification:
```sql
INSERT INTO notifications (notification_id, student_id, title, message, notification_type, priority, status, metadata)
VALUES ('notif-9182', 'student-1042', 'Placement Update', 'Interview scheduled for Monday.', 'Event', 'normal', 'unread', '{"company":"Acme Corp"}');
```
Fetch notifications:
```sql
SELECT notification_id, title, status, created_at
FROM notifications
WHERE student_id = 'student-1042' AND status = 'unread' AND is_deleted = FALSE
ORDER BY created_at DESC
LIMIT 20;
```
Mark read:
```sql
UPDATE notifications
SET status = 'read', updated_at = NOW()
WHERE notification_id = 'notif-9182' AND student_id = 'student-1042';
```
Delete notification:
```sql
UPDATE notifications
SET is_deleted = TRUE, updated_at = NOW()
WHERE notification_id = 'notif-9182' AND student_id = 'student-1042';
```
