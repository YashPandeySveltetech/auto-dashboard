/** @format */

import React, { Component, useCallback, useState } from 'react';
import DropDown from '../../components/dropdown';
import Radio from '../../components/radio';
import CDR_FORM from './crdform';
import CAF_FORM from './cafForm';

import IPDR_FORM from './ipdrForm';
import TOWER_DUMP_FORM from './towerdumpForm';


// export class RequestForm extends Component {

function RequestForm() {
	const [activeForm, setActiveForm] = useState('CDR_FORM');

	const formHandler = useCallback(() => {
		if (activeForm === 'CDR_FORM') {
			return <CDR_FORM />;
		}
    if (activeForm === 'TOWER_DUMP_FORM') {
			return <TOWER_DUMP_FORM />;
		}
    if (activeForm === 'IPDR_FORM') {
			return <IPDR_FORM />;
		}
    if (activeForm === 'CAF_FORM') {
			return <CAF_FORM />;
		}
	}, [activeForm]);

	return (
		<>
			<div className='flex gap-5'>
				{' '}
				<Radio
					value={'CDR_FORM' == activeForm}
					label='CDR'
					name='browser'
					handleChange={() => {
						setActiveForm('CDR_FORM');
					}}
				/>{' '}
				<Radio
					value={'IPDR_FORM' == activeForm}
					label='IPDR'
					name='browser'
					handleChange={() => {
						setActiveForm('IPDR_FORM');
					}}
				/>{' '}
				<Radio
					value={'TOWER_DUMP_FORM' == activeForm}
					label='TOWER DUMP'
					name='browser'
					handleChange={() => {
						setActiveForm('TOWER_DUMP_FORM');
					}}
				/>{' '}
				<Radio
					value={'CAF_FORM' == activeForm}
					label='CAF'
					name='browser'
					handleChange={() => {
						setActiveForm('CAF_FORM');
					}}
				/>
			</div>

			<div>{formHandler()}</div>
		</>
	);
}
// }

export default RequestForm;
