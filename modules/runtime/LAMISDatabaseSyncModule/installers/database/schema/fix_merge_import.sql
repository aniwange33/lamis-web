CREATE OR REPLACE FUNCTION importmerge() RETURNS VOID AS $$
	DECLARE
		t VARCHAR;
		c VARCHAR;
    BEGIN
        ALTER TABLE appointment DROP COLUMN IF EXISTS appointment_id CASCADE;
        ALTER TABLE child DROP COLUMN IF EXISTS child_id CASCADE;
        ALTER TABLE clinic DROP COLUMN IF EXISTS clinic_id CASCADE;
        ALTER TABLE clinic DROP COLUMN IF EXISTS regimen CASCADE;
        ALTER TABLE delivery DROP COLUMN IF EXISTS delivery_id CASCADE;
        ALTER TABLE devolve DROP COLUMN IF EXISTS regimen CASCADE;
        ALTER TABLE encounter DROP COLUMN IF EXISTS encounter_id CASCADE;
        ALTER TABLE hts DROP COLUMN IF EXISTS hts_id CASCADE;
        ALTER TABLE patient DROP COLUMN IF EXISTS regimen CASCADE;
        ALTER TABLE patient DROP COLUMN IF EXISTS date_next_refill CASCADE;
        ALTER TABLE patient DROP COLUMN IF EXISTS date_next_clinic CASCADE;
        ALTER TABLE status DROP COLUMN IF EXISTS status_id CASCADE;

        FOR t IN SELECT unnest(ARRAY['patient','clinic', 'laboratory', 'pharmacy', 'appointment', 'assessment', 'biometric', 'child',
            'delivery', 'devolve', 'hts', 'index_contact', 'participant', 'anc'])
		LOOP
			FOR c IN SELECT unnest(ARRAY['user_id','id_uuid', 'morning', 'afternoon', 'evening', 'comment', 'uploaded',
										 'time_uploaded', 'time_stamp', 'prescrip_error', 'adr_ids', 'duration', 'date_reported',
										 'resultab', 'resultpc', 'communitypharm_id', 'oi_ids', 'adhere_ids', 'type_dmoc',
										 'state', 'lga', 'next_kin', 'relation_kin', 'kin_address', 'kin_phone', 'eid_id',
										 'date_current_status', 'last_clinic_stage', 'last_viral_load', 'regimentype',
										 'date_last_clinic', 'date_last_refill', 'last_cd4', 'date_last_cd4', 'date_last_viral_load',
										 'last_viral_load', 'last_clinic_stage', 'date_last_clinic_stage', 'arv_dispensed',
										 'status_registration', 'current_status', 'date_current_status', 'last_cd4p', 'viral_load_due_date',
										 'viral_load_type', 'last_refill_duration', 'last_refill_setting', 'cause_death',
										 'date_tracked', 'outcome', 'agreed_date', 'casemanager_id'])
			LOOP
        		EXECUTE FORMAT('ALTER TABLE %s DROP COLUMN IF EXISTS %s CASCADE', t, c);
			END LOOP;
		END LOOP;

		DROP TABLE IF EXISTS adherehistory CASCADE;
		DROP TABLE IF EXISTS adrhistory CASCADE;
		DROP TABLE IF EXISTS adr CASCADE;
		DROP TABLE IF EXISTS casemanager CASCADE;
		DROP TABLE IF EXISTS childfollowup CASCADE;
		DROP TABLE IF EXISTS chroniccare CASCADE;
		DROP TABLE IF EXISTS clients CASCADE;
		DROP TABLE IF EXISTS communitypharm CASCADE;
		DROP TABLE IF EXISTS dhisvalue CASCADE;
		DROP TABLE IF EXISTS dmscreen CASCADE;
		DROP TABLE IF EXISTS dmscreenhistory CASCADE;
		DROP TABLE IF EXISTS drugtherapy CASCADE;
		DROP TABLE IF EXISTS indexcontact CASCADE;
		DROP TABLE IF EXISTS indicatorvalue CASCADE;
		DROP TABLE IF EXISTS labtest CASCADE;
		DROP TABLE IF EXISTS labtestcategory CASCADE;
		DROP TABLE IF EXISTS maternalfollowup CASCADE;
		DROP TABLE IF EXISTS motherinformation CASCADE;
		DROP TABLE IF EXISTS oihistory CASCADE;
		DROP TABLE IF EXISTS partnerinformation CASCADE;
		DROP TABLE IF EXISTS patientcasemanager CASCADE;
		DROP TABLE IF EXISTS performance CASCADE;
		DROP TABLE IF EXISTS privilege CASCADE;
		DROP TABLE IF EXISTS regimendrug CASCADE;
		DROP TABLE IF EXISTS regimenhistory CASCADE;
		DROP TABLE IF EXISTS regimentype CASCADE;
		DROP TABLE IF EXISTS statushistory CASCADE;
		DROP TABLE IF EXISTS tbscreen CASCADE;
		DROP TABLE IF EXISTS tbscreenhistory CASCADE;
		DROP TABLE IF EXISTS unsent CASCADE;
		DROP TABLE IF EXISTS public.user CASCADE;
		DROP TABLE IF EXISTS userprivilege CASCADE;
		DROP TABLE IF EXISTS validated CASCADE;
    END;
$$
LANGUAGE PLPGSQL;

SELECT importmerge();
