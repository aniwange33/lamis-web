CREATE OR REPLACE FUNCTION fixstatus() RETURNS VOID AS $$
    BEGIN
        ALTER TABLE status_history ADD COLUMN auto BOOLEAN;
        UPDATE status_history SET auto = FALSE;
        DELETE FROM status_history WHERE current_status = '' OR current_status IS NULL;
        ALTER TABLE status_history ALTER COLUMN auto SET NOT NULL;
        ALTER TABLE status_history ALTER COLUMN auto SET DEFAULT FALSE;
        ALTER TABLE status_history RENAME cause_death TO cause_of_death;
        ALTER TABLE status_history RENAME current_status TO status;
        ALTER TABLE status_history RENAME date_current_status TO date_status;
        ALTER TABLE status_history RENAME reason_interrupt TO reason_for_interruption;

        UPDATE status_history SET status = (SELECT CASE LOWER(TRIM(status)) WHEN 'art start' THEN 'ART_START' WHEN 'art restart' THEN
        'ART_RESTART' WHEN 'known death' THEN 'KNOWN_DEATH' WHEN 'art transfer out' THEN 'ART_TRANSFER_OUT' WHEN
        'pre-art transfer out' THEN 'PRE_ART_TRANSFER_OUT' WHEN 'lost to follow up' THEN 'LOST_TO_FOLLOWUP' WHEN
        'previously undocumented patient transfer (confirmed)' THEN 'PREVIOUSLY_UNDOCUMENTED_TRANSFER_CONFIRMED' WHEN
        'traced patient (unable to locate)' THEN 'TRACED_UNABLE_TO_LOCATE' WHEN 'traced patient and agreed to return to care'
        THEN 'TRACED_AGREED_TO_RETURN_TO_CARE' WHEN 'did not attempt to trace patient' THEN 'DID_NOT_ATTEMPT_TO_TRACE'
        WHEN 'hiv exposed status unknown' THEN 'HIV_EXPOSED_STATUS_UNKNOWN' WHEN 'stopped treatment' THEN 'STOPPED_TREATMENT'
        WHEN 'hiv+ non art' THEN 'HIV_PLUS_NON_ART' WHEN 'pre-art transfer in' THEN 'PRE_ART_TRANSFER_IN' WHEN
        'art transfer in' THEN 'ART_TRANSFER_IN' WHEN 'art start - external' THEN 'ART_START_EXTERNAL'
        WHEN 'hiv negative' THEN 'HIV_NEGATIVE' WHEN 'hiv exposed infant status negative' THEN
        'HIV_EXPOSED_INFANT_NEGATIVE' WHEN 'hiv exposed baby hiv status unknown' THEN 'HIV_EXPOSED_BABY_HIV_STATUS_UNKNOWN' END);

        UPDATE status_history SET outcome = (SELECT CASE LOWER(TRIM(outcome)) WHEN 'art start' THEN 'ART_START' WHEN 'art restart' THEN
        'ART_RESTART' WHEN 'known death' THEN 'KNOWN_DEATH' WHEN 'art transfer out' THEN 'ART_TRANSFER_OUT' WHEN
        'pre-art transfer out' THEN 'PRE_ART_TRANSFER_OUT' WHEN 'lost to follow up' THEN 'LOST_TO_FOLLOWUP' WHEN
        'previously undocumented patient transfer (confirmed)' THEN 'PREVIOUSLY_UNDOCUMENTED_TRANSFER_CONFIRMED' WHEN
        'traced patient (unable to locate)' THEN 'TRACED_UNABLE_TO_LOCATE' WHEN 'traced patient and agreed to return to care'
        THEN 'TRACED_AGREED_TO_RETURN_TO_CARE' WHEN 'did not attempt to trace patient' THEN 'DID_NOT_ATTEMPT_TO_TRACE'
        WHEN 'hiv exposed status unknown' THEN 'HIV_EXPOSED_STATUS_UNKNOWN' WHEN 'stopped treatment' THEN 'STOPPED_TREATMENT'
        WHEN 'hiv+ non art' THEN 'HIV_PLUS_NON_ART' WHEN 'pre-art transfer in' THEN 'PRE_ART_TRANSFER_IN' WHEN
        'art transfer in' THEN 'ART_TRANSFER_IN' WHEN 'art start - external' THEN 'ART_START_EXTERNAL'
        WHEN 'hiv negative' THEN 'HIV_NEGATIVE' WHEN 'hiv exposed infant status negative' THEN
        'HIV_EXPOSED_INFANT_NEGATIVE' WHEN 'hiv exposed baby hiv status unknown' THEN 'HIV_EXPOSED_BABY_HIV_STATUS_UNKNOWN' END);

        UPDATE patient SET status_at_registration = (SELECT CASE LOWER(TRIM(status_at_registration)) WHEN 'art start' THEN 'ART_START' WHEN 'art restart' THEN
        'ART_RESTART' WHEN 'known death' THEN 'KNOWN_DEATH' WHEN 'art transfer out' THEN 'ART_TRANSFER_OUT' WHEN
        'pre-art transfer out' THEN 'PRE_ART_TRANSFER_OUT' WHEN 'lost to follow up' THEN 'LOST_TO_FOLLOWUP' WHEN
        'previously undocumented patient transfer (confirmed)' THEN 'PREVIOUSLY_UNDOCUMENTED_TRANSFER_CONFIRMED' WHEN
        'traced patient (unable to locate)' THEN 'TRACED_UNABLE_TO_LOCATE' WHEN 'traced patient and agreed to return to care'
        THEN 'TRACED_AGREED_TO_RETURN_TO_CARE' WHEN 'did not attempt to trace patient' THEN 'DID_NOT_ATTEMPT_TO_TRACE'
        WHEN 'hiv exposed status unknown' THEN 'HIV_EXPOSED_STATUS_UNKNOWN' WHEN 'stopped treatment' THEN 'STOPPED_TREATMENT'
        WHEN 'hiv+ non art' THEN 'HIV_PLUS_NON_ART' WHEN 'pre-art transfer in' THEN 'PRE_ART_TRANSFER_IN' WHEN
        'art transfer in' THEN 'ART_TRANSFER_IN' WHEN 'art start - external' THEN 'ART_START_EXTERNAL'
        WHEN 'hiv negative' THEN 'HIV_NEGATIVE' WHEN 'hiv exposed infant status negative' THEN
        'HIV_EXPOSED_INFANT_NEGATIVE' WHEN 'hiv exposed baby hiv status unknown' THEN 'HIV_EXPOSED_BABY_HIV_STATUS_UNKNOWN' END);

        DELETE FROM status_history WHERE status = '' OR status IS NULL;
    END;
$$
LANGUAGE PLPGSQL;

SELECT fixstatus();
