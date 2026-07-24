// Krowdit Dashboard — DSA Screening Question
 // A customer can have the dashboard open in multiple tabs at once,
 // producing overlapping "active session" windows. Merge all
 // overlapping/adjacent sessions and return the merged list,
 // sorted by start time.
  
 /**
  * @param {number[][]} sessions - array of [start, end] in minutes
  * @returns {number[][]}
  */
 function mergeSessions(sessions) {
  if(sessions.length===0)
    return [];
  sessions.sort((a,b)=>a[0]-b[0]);
  let result=[sessions[0]];
  for(let i=1;i<sessions.length;i++)
  {
    let last=result[result.length-1];
    if(sessions[i][0]<=last[1])
    {
      last[i]=Math.max(last[1],sessions[i][1]);
    }
    else{
      result.push(sessions[i]);
    }
  }
  return result;
   // TODO: implement in O(n log n)
 }
  
 // --- test calls ---
 console.log(mergeSessions([[10, 20], [15, 25], [40, 50], [45, 55], [70, 72]]));
 console.log(mergeSessions([[1, 5]]));
 console.log(mergeSessions([]));