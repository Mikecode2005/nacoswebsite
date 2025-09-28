-- Update some events to have future dates so they appear in the upcoming events carousel
UPDATE events 
SET event_date = '2025-12-15 10:00:00+00',
    updated_at = NOW()
WHERE id = '657a1c60-72e5-480c-992d-625174392780';

UPDATE events 
SET event_date = '2025-11-20 14:00:00+00',
    updated_at = NOW()
WHERE id = '931f2f9b-b1ca-4656-b6e1-8d60c4ca364e';

UPDATE events 
SET event_date = '2025-10-25 10:00:00+00',
    updated_at = NOW()
WHERE id = '833ac5f6-2305-4d61-9400-29b84ca71f07';