import { rest } from 'msw'

export const handlers = [
    rest.get('https://afternoon-peak-67651.herokuapp.com/events', (req, res, ctx) => {
        return res(
            ctx.json({ "data": [{ "id": "fdd52a68-cccc-404d-b054-40e612e26df1", "type": "events", "attributes": { "mood": "happy", "visit_id": "5cd753f0-8b66-f8a8-4275-60ef0c0ee1d5", "timestamp": "2019-05-12T15:20:15+01:00", "event_type": "mood_observation", "caregiver_id": "868ffde9-b069-4af5-8835-c4ac4e72e4b5", "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d" } }, { "id": "7baf6264-862f-4da2-979d-e5c5265edcf9", "type": "events", "attributes": { "mood": "okay", "visit_id": "4446fe54-a58f-4aa3-b66d-b68f78c73dfd", "timestamp": "2019-05-11T22:05:42+01:00", "event_type": "mood_observation", "caregiver_id": "ac3967a6-1392-4227-9987-a201e0f8f287", "care_recipient_id": "ad3512a6-91b1-4d7d-a005-6f8764dd0111" } }]})
        )
    })
]