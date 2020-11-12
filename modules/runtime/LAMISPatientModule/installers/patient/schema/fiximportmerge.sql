CREATE OR REPLACE FUNCTION importmerge() RETURNS VOID AS $$
	DECLARE
		t VARCHAR;
		c VARCHAR;
    BEGIN
        FOR t IN SELECT unnest(ARRAY['patient','clinic', 'laboratory', 'pharmacy', 'appointment', 'assessment', 'biometric', 'child',
        'delivery', 'devolve'])
		LOOP
			FOR c IN SELECT unnest(ARRAY['user_id','id_uuid', 'morning', 'afternoon', 'evening', 'comment', 'uploaded',
										 'time_uploaded', 'time_stamp', 'prescrip_error', 'adr_ids', 'duration', 'date_reported',
										 'resultab', 'resultpc', 'communitypharm_id', 'oi_ids', 'adhere_ids', 'type_dmoc',
										 'state', 'lga', 'next_kin', 'kin_relationship', 'kin_address', 'kin_phone',
										 'date_current_status', 'last_clinic_stage', 'last_viral_load'])
			LOOP
        		EXECUTE FORMAT('ALTER TABLE %s DROP COLUMN IF EXISTS %s CASCADE', t, c);
			END LOOP;
		END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

SELECT importmerge();
