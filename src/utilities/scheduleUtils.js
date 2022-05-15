import { getUnixTime, addHours } from "date-fns";
import { setDateToZeroHours } from "./dateUtils";

const compareStrings = (a, b) => {
    if(a.length !== b.length) {
        return false
    }
    return a.localeCompare(b) === 0
}

export const compareEvents = (originalEvent, changedEvent) => {
    const compareLeads = compareStrings(originalEvent.techLead, changedEvent.techLead)
    const compareHelpers = compareStrings(originalEvent.techHelper, changedEvent.techHelper)
    if(compareLeads === true) {
        if(compareHelpers === true) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export const compareHelper = (originalEvent, changedEvent) => {
    if(originalEvent.techHelper === changedEvent.techHelper) {
        return false
    } else {
        return true
    }
}

export const compareLead = (originalEvent, changedEvent) => {
    if(originalEvent.techLead === changedEvent.techLead) {
        return false
    } else {
        return true
    }
}

export const finalUpdate = (eventToUpdate) => {
        const updatedDispatch = {
          id: eventToUpdate.id,
          start: eventToUpdate.start,
          leadSource: eventToUpdate.leadSource,
          takenBy: eventToUpdate.takenBy,
          firstname: eventToUpdate.firstname,
          lastname: eventToUpdate.lastname,
          street: eventToUpdate.street,
          city: eventToUpdate.city,
          phoneName: eventToUpdate.phoneName,
          altPhoneName: eventToUpdate.altPhoneName,
          phone: eventToUpdate.phone,
          altphone: eventToUpdate.altphone,
          issue: eventToUpdate.issue,
          timeAlotted: eventToUpdate.timeAlotted,
          techLead: eventToUpdate.techLead,
          techHelper: eventToUpdate.techHelper,
          techHelperId: eventToUpdate.techHelperId ? eventToUpdate.techHelperId : "",
          payment: eventToUpdate.payment,
          notes: eventToUpdate.notes,
          timeOfDay: eventToUpdate.timeOfDay,
          jobNumber: eventToUpdate.jobNumber,
          status: eventToUpdate.status,
          customerId: eventToUpdate.customerId,
          dateCreated: eventToUpdate.dateCreated,
          dateScheduled: eventToUpdate.start,
          dateModified: new Date(),
          scheduledDate: getUnixTime(setDateToZeroHours(eventToUpdate.start)),
          end: addHours(setDateToZeroHours(eventToUpdate.start), 1),
          shorthand: eventToUpdate.shorthand,
          title: `${eventToUpdate.timeAlotted} /${eventToUpdate.lastname} /${eventToUpdate.shorthand} /${eventToUpdate.timeOfDay}`,
        };
    return updatedDispatch
}