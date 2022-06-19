// https://leetcode.com/problems/merge-two-sorted-lists/

import { ListNode } from "./helpers";

function mergeTwoLists(
	list1: ListNode | null,
	list2: ListNode | null
): ListNode | null {
	if (!list1) return list2;
	if (!list2) return list1;

	const smallestHead = list1.val <= list2.val ? list1 : list2;
	const biggestHead = list1.val > list2.val ? list1 : list2;

	smallestHead.next = mergeTwoLists(smallestHead.next, biggestHead);

	return smallestHead;
}

console.log(
	ListNode.toArray(
		mergeTwoLists(
			ListNode.fromArray([1, 2, 4]),
			ListNode.fromArray([1, 3, 4])
		)
	)
); // [1, 1, 2, 3, 4, 4]
