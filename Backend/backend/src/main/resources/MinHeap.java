public class MinHeap
{
    static void heapify(int arr[],int n, int i)
    {
        int smallest=i;
        int left=2*i+1;
        int right=2*i+2;
        if(left<n && arr[left]<arr[smallest])
        {
            smallest=left;
        }
        if(right<n && arr[right]<arr[smallest])
            {
                smallest=right;
            }
        if(smallest!=i)
        {
            int temp=arr[i];
            arr[i]=arr[smallest];
            arr[smallest]=temp;
            heapify(arr,n,smallest);
        }
        
    }
    static void buildHeap(int arr[],int n)
    {
        for(int i=n/2-1;i>=0;i--)
        {
            heapify(arr,n,i);
        }
    }
    static void printHeap(int arr[],int n)
    {
        for(int i=0;i<n;i++)
        {
            System.out.println(arr[i]+" ");

        }

    }
    public static void main(String args[])
    {
        int arr[]={10,20,15,30,40};
        int n=arr.length;
        buildHeap(arr,n);
        System.out.println("Min Heap is");
        printHeap(arr,n);

    }
    

}