CREATE OR REPLACE FUNCTION remove_orphaned_records() RETURNS VOID AS $$
	DECLARE
		t VARCHAR;
		c VARCHAR;
    BEGIN
        FOR t IN SELECT unnest(ARRAY['status_history', 'regimen_history', 'child', 'devolve',
                'tb_screen_history', 'dm_screen_history', 'oi_history', 'adhere_history', 'adr_history',
                'chronic_care', 'clinic', 'regimen_history', 'laboratory_line', 'laboratory', 'pharmacy_line',
                'pharmacy', 'eac', 'nigqual', 'patient_case_manager', 'prescription', 'maternal_followup',
				'mother_information', 'drug_therapy', 'encounter', 'delivery', 'anc', 'appointment'])
		LOOP
        	EXECUTE FORMAT('delete from %s t where facility_id != (select facility_id from patient where id = t.patient_id)', t);
		END LOOP;

		FOR t IN SELECT unnest(ARRAY['child'])
		LOOP
        	EXECUTE FORMAT('delete from %s t where facility_id != (select facility_id from mother_information where id = t.mother_id)', t);
		END LOOP;

		FOR t IN SELECT unnest(ARRAY['child_followup'])
		LOOP
        	EXECUTE FORMAT('delete from %s t where facility_id != (select facility_id from child where id = t.child_id)', t);
		END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

SELECT remove_orphaned_records();
